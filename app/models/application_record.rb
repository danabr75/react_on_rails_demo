class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  # User.nested_attributes_parameter_tree(User.last, :create)
  def self.nested_attributes_parameter_tree user, action_name
    accepts_nested_attributes_tree(user, action_name, {parameterize: true})
  end

  # User.accepts_nested_attributes_tree(User.last, :create)
  def self.accepts_nested_attributes_tree user, action_name, opts ={}, depth = 0
    association_parameters = user.current_ability.permitted_attributes(action_name.to_sym, self)
    if depth > 30
      return association_parameters
    end

    self.reflect_on_all_associations(:has_many).each do |assoc_class|
      resource_key = assoc_class.name

      parameter_key = (resource_key.to_s.singularize + '_ids').to_sym
      permission_key = ('can_' + resource_key.to_s.singularize + '_ids').to_sym
      nested_key = parameter_key
      unless opts[:parameterize]
        nested_key = resource_key.to_sym
      end

      if user.can?(permission_key.to_sym, self) || user.can?(action_name.to_sym, self, parameter_key)
        association_parameters << {
          nested_key => []
        }
      end
    end

    self.nested_attributes_options.each do |resource_key, options|
      reflection_class = self.reflect_on_association(resource_key).class
      reflection_type  = reflection_class.name
      assoc_class = self.reflect_on_association(resource_key).klass
      if [
        "ActiveRecord::Reflection::BelongsToReflection",
        "ActiveRecord::Reflection::HasOneReflection",
        "ActiveRecord::Reflection::HasManyReflection"
      ].include?(reflection_type)

        parameter_key = (resource_key.to_s + '_attributes').to_sym
        nested_key = parameter_key

        unless opts[:parameterize]
          nested_key = resource_key.to_sym
        end

        permission_key = ('can_' + resource_key.to_s.singularize + '_attributes').to_sym
        if user.can?(permission_key.to_sym, self) || user.can?(action_name.to_sym, self, parameter_key)
          # issue here is the 'action_name' on the root 'self' may not be the action that the user has for the 'assoc_class'
          # i.e:
          #   We may want the user to update Account, and create attachments on it, but not 'update' attachments.
          whitelist_assoc_parameters = user.current_ability.permitted_attributes(action_name.to_sym, assoc_class)

          if options[:allow_destroy] && user.can?(:destroy, assoc_class)
            whitelist_assoc_parameters << :_destroy
          end

          # Handle recursion
          whitelist_assoc_parameters += assoc_class.accepts_nested_attributes_tree(user, action_name, opts, depth + 1)
          # whitelist_assoc_parameters = whitelist_assoc_parameters - assoc_class::BLOCK_ATTRIBS_FROM_CONTROLLER_PARAMS

          association_parameters << {
            nested_key => whitelist_assoc_parameters
          }
        end
      end
    end

    return association_parameters
  end
end
