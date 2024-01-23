# form_generator.rb
class FormGenerator
  attr_reader :model_class, :assocs_and_attribs, :current_user, :errors, :readonly, :current_ability, :action_name

  def initialize(model_class, current_user, action_name, assocs_and_attribs, opts = {})
    @model_class = model_class
    @current_user = current_user

    @current_ability = current_user.current_ability

    @assocs_and_attribs = assocs_and_attribs
    @action_name = action_name.to_sym
    @errors = []
    puts "GENERAOTR: #{opts[:readonly]}"
    puts opts[:readonly].inspect
    @readonly = opts[:readonly] == true ? true : false
  end

  # [:role_ids, :email, {:user_roles=>[]}, {:roles=>[]}]
  def generate_form
    stringified_fields = []
    puts "@assocs_and_attribs.inspect"
    puts @assocs_and_attribs.inspect

    @assocs_and_attribs.each do |assoc_or_attrib|
      puts "BEFORE - assoc_or_attrib: #{assoc_or_attrib.inspect}"
      if assoc_or_attrib.is_a?(Hash)
        if assoc_or_attrib.keys.length > 1
          raise Exception.new(
            "Internal Server Error: FormGenerator - Too many keys in assocation hash! 
            #{assoc_or_attrib.keys.join(', ')}
          ")
        else
          assoc_or_attrib = assoc_or_attrib.keys.first
        end
      end

      puts "AFTER - assoc_or_attrib: #{assoc_or_attrib.inspect}"

      assoc_or_attrib = assoc_or_attrib.to_sym
      input_name = assoc_or_attrib
      # In the future, allow assocation field updates. For now, just join them.
      if assoc_or_attrib.to_s.end_with?('_ids')
        input_name = assoc_or_attrib.to_s.sub(/_ids$/, 's').to_sym
      end

      if model_class.column_names.include?(assoc_or_attrib.to_s)
        # Check for Attribute
        attrib_name = assoc_or_attrib
        attrib_type = model_class.column_for_attribute(attrib_name).type
        if attrib_type == :string
          stringified_fields << generate_string_input(input_name, assoc_or_attrib)
        elsif attrib_type == :text
          stringified_fields << generate_text_input(input_name, assoc_or_attrib)
        elsif attrib_type == :datetime
          stringified_fields << generate_datetime_input(input_name, assoc_or_attrib)
        elsif attrib_type == :integer
          stringified_fields << generate_integer_input(input_name, assoc_or_attrib)
        elsif attrib_type == :boolean
          stringified_fields << generate_boolean_input(input_name, assoc_or_attrib)
        else
          @errors << "FormGenerator - attrib type not supported: (#{attrib_type})"
        end
      elsif model_class.reflect_on_all_associations.collect{ |v| v.name.to_sym }.include?(input_name)
        # Check for Association
        # - Can check permissions for attributes 
        assoc_name = assoc_or_attrib
        assoc_type = association_type(input_name)

        case assoc_type
        when :belongs_to
          stringified_fields << generate_belongs_to_input(input_name, assoc_name)
        when :has_one
          stringified_fields << generate_has_one_input(input_name, assoc_name)
        when :has_many
          stringified_fields << generate_has_many_input(input_name, assoc_name)
        else
          @errors << "FormGenerator - assoc type not supported: (#{assoc_type})"
        end
      elsif model_class.reflect_on_all_attachments.collect{ |v| v.name.to_sym }.include?(input_name)
        # only supporting a has_one attachment currently
        stringified_fields << generate_attachment_input(assoc_or_attrib, assoc_or_attrib)
      else
        @errors << "FormGenerator - not assoc AND not attrib: (#{assoc_or_attrib})"
      end
    end

    if @errors.any?
      Rails.logger.error("Internal Server Error - FormGenerator: #{@errors.join(";")}")
    end

    puts "FormGenerator: #{stringified_fields.join("\n")}"

    stringified_fields.join("<br/>").html_safe
  end

  private

  def association_type(attribute)
    @model_class.reflect_on_association(attribute)&.macro
  end

  # START FIELD INPUTS
  def generate_boolean_input(input_name, attribute)
    field_logic = []
    field_logic << "f.check_box :#{input_name}"

    if @readonly || !validate_permission?(input_name)
      field_logic << "disabled: true"
    end
    """
      <%= f.label :#{input_name} %>
      <%= #{field_logic.join(', ')} %>
    """
  end

  def generate_text_input(input_name, attribute)
    puts "generate_text_input(#{input_name}, #{attribute})"
    field_logic = []
    field_logic << "f.text_area :#{input_name}"

    # user.current_ability.permitted_attributes(action_name.to_sym, self)
    if @readonly || !validate_permission?(input_name)
      field_logic << "disabled: true"
    end
    """
      <%= f.label :#{input_name} %>
      <%= #{field_logic.join(', ')} %>
    """
  end
  def generate_string_input(input_name, attribute)
    field_logic = []
    field_logic << "f.text_field :#{input_name}"
    if @readonly || !validate_permission?(input_name)
      field_logic << "disabled: true"
    end
    """
      <%= f.label :#{input_name} %>
      <%= #{field_logic.join(', ')} %>
    """
  end

  def generate_datetime_input(input_name, attribute)
    field_logic = []
    field_logic << "f.datetime_local_field :#{input_name}"
    if @readonly || !validate_permission?(input_name)
      field_logic << "disabled: true"
    end
    """
      <%= f.label :#{input_name} %>
      <%= #{field_logic.join(', ')} %>
    """
  end

  def generate_integer_input(input_name, attribute)
    field_logic = []
    field_logic << "f.number_field :#{input_name}"
    if @readonly || !validate_permission?(input_name)
      field_logic << "disabled: #{@readonly}"
    end
    """
      <%= f.label :#{input_name} %>
      <%= #{field_logic.join(', ')} %>
    """
  end
  # END FIELD INPUTS

  # START ASSOC INPUTS
  def generate_belongs_to_input(input_name, association)
    return '' unless validate_permission?(association)
    assoc_class = association_class(input_name)
    options = assoc_class.all.map { |record| [record.name, record.id] }

    """
      <%= f.label :#{association}, '#{input_name}'.camelize %>
      <% options = #{options} %>
      <%= f.collection_select :#{association}, options, :last, :first, prompt: true #{@readonly ? ', disabled: true' : ''} %>
    """
  end

  def generate_has_one_input(input_name, association)
    return '' unless validate_permission?(association)
    assoc_class = association_class(input_name)
    options = assoc_class.accessible_by(@current_user.current_ability).collect{ |x| [x.name, x.id] }
    puts "OPTIONS: #{options.inspect}"
    """
      <%= f.label :#{association}, '#{input_name}'.camelize %>
      <% options = #{options} %>
      <%= f.collection_select :#{association}, options, :last, :first, prompt: true #{@readonly ? ', disabled: true' : ''} %>
    """
  end

  def generate_has_many_input(input_name, association)
    return '' unless validate_permission?(association)
    assoc_class = association_class(input_name)
    options = assoc_class.accessible_by(@current_user.current_ability).collect{ |x| [x.name, x.id] }
    puts "OPTIONS: #{options.inspect}"

    """
      <%= f.label :#{association}, '#{input_name}'.camelize %>
      <% options = #{options} %>
      <%= f.collection_select :#{association}, options, :last, :first, {}, multiple: true #{@readonly ? ', disabled: true' : ''} %>
    """
  end

  # 1st GENNed
  def generate_association_select(input_name, association)
    assoc_class = association.to_s.classify.constantize
    options = assoc_class.accessible_by(@current_user.current_ability).collect{ |x| [x.name, x.id] }
    puts "OPTIONS: #{options.inspect}"

    """
      <%= f.label :#{association}, '#{input_name}'.camelize %>
      <% options = #{options} %>
      <%= f.collection_select :#{association}_id, options, :last, :first, prompt: true #{@readonly ? ', disabled: true' : ''} %>
    """
  end
  # END ASSOC INPUTS

  # START ATTACHMENT INPUTS
  def generate_attachment_input(input_name, association)
    "
      <%= f.label :#{association}, '#{input_name}'.camelize %>
      <%= f.file_field :#{association} #{@readonly ? ', disabled: true' : ''} %>
    "
  end
  # END ATTACHMENT INPUTS

  def association_class(attribute)
    @model_class.reflect_on_association(attribute)&.klass
  end

  def validate_permission? assoc_or_input
    @current_ability.permitted_attributes(@action_name, @model_class).include?(assoc_or_input)
  end
end