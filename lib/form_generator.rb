# form_generator.rb
class FormGenerator
  attr_reader :model_class, :attributes, :associations

  def initialize(model_class, current_user, assocs_and_attribs, opts = {})
    @model_class = model_class
    @current_user = current_user
    @assocs_and_attribs = assocs_and_attribs
    @errors = []
    puts "GENERAOTR: #{opts[:readonly]}"
    puts opts[:readonly].inspect
    @readonly = opts[:readonly] == true ? true : false
  end

  def generate_form
    stringified_fields = []
    @assocs_and_attribs.each do |assoc_or_attrib|
      if model_class.column_names.include?(assoc_or_attrib.to_s)
        attrib_name = assoc_or_attrib
        attrib_type = model_class.column_for_attribute(attrib_name).type
        if attrib_type == :string
          stringified_fields << generate_string_input(assoc_or_attrib)
        elsif attrib_type == :text
          stringified_fields << generate_text_input(assoc_or_attrib)
        elsif attrib_type == :datetime
          stringified_fields << generate_datetime_input(assoc_or_attrib)
        elsif attrib_type == :integer
          stringified_fields << generate_integer_input(assoc_or_attrib)
        else
          @errors << "FormGenerator - attrib type not supported: (#{attrib_type})"
        end
      elsif model_class.reflect_on_all_associations.collect{ |v| v.name.to_sym }.include?(assoc_or_attrib)
        assoc_name = assoc_or_attrib
        assoc_type = association_type(assoc_name)

        case assoc_type
        when :belongs_to
          stringified_fields << generate_belongs_to_input(attribute)
        when :has_one
          stringified_fields << generate_has_one_input(attribute)
        when :has_many
          stringified_fields << generate_has_many_input(attribute)
        else
          @errors << "FormGenerator - assoc type not supported: (#{assoc_type})"
        end

      else
        @errors << "FormGenerator - not assoc AND not attrib: (#{assoc_or_attrib})"
      end
    end

    if @errors.any?
      Rails.logger.error("Internal Server Error - FormGenerator: #{@errors.join(";")}")
    end

    puts "FormGenerator: #{stringified_fields.join("\n")}"

    stringified_fields.join("\n").html_safe
  end

  private

  # START FIELD INPUTS
  def association_type(attribute)
    @model_class.reflect_on_association(attribute)&.macro
  end

  def generate_text_input(attribute)
    field_logic = []
    field_logic << "f.text_area :#{attribute}"
    if @readonly
      field_logic << "disabled: true"
    end
    "<%= f.label :#{attribute} %>\n<%= #{field_logic.join(', ')} %>"
  end
  def generate_string_input(attribute)
    field_logic = []
    field_logic << "f.text_field :#{attribute}"
    if @readonly
      field_logic << "disabled: true"
    end
    "<%= f.label :#{attribute} %>\n<%= #{field_logic.join(', ')} %>"
  end

  def generate_datetime_input(attribute)
    field_logic = []
    field_logic << "f.datetime_local_field #{attribute}"
    if @readonly
      field_logic << "disabled: true"
    end
    "<%= f.label :#{attribute} %>\n<%= #{field_logic.join(', ')} %>"
  end

  def generate_integer_input(attribute)
    field_logic = []
    field_logic << "f.number_field :#{attribute}"
    if @readonly
      field_logic << "disabled: #{@readonly}"
    end
    "<%= f.label :#{attribute} %>\n<%= #{field_logic.join(', ')} %>"
  end
  # END FIELD INPUTS

  # START ASSOC INPUTS
  def generate_belongs_to_input(attribute)
    association_class = association_class(attribute)
    options = association_class.all.map { |record| [record.name, record.id] }

    "<%= f.label :#{attribute} %>\n<%= f.collection_select :#{attribute}_id, options, :last, :first, prompt: true %>"
  end

  def generate_has_one_input(attribute)
    association_class = association_class(attribute)
    options = association_class.accessible_by(@current_user.current_ability).collect{ |x| [x.name, x.id] }

    "<%= f.label :#{attribute} %>\n<%= f.collection_select :#{attribute}_id, options, :last, :first, prompt: true %>"
  end

  def generate_has_many_input(attribute)
    association_class = association_class(attribute)
    options = association_class.accessible_by(@current_user.current_ability).collect{ |x| [x.name, x.id] }

    "<%= f.label :#{attribute} %>\n<%= f.collection_select :#{attribute}_ids, options, :last, :first, {}, multiple: true %>"
  end

  def generate_association_select(association)
    association_class = association.to_s.classify.constantize
    options = association_class.accessible_by(@current_user.current_ability).collect{ |x| [x.name, x.id] }

    "<%= f.label :#{association} %>\n<%= f.collection_select :#{association}_id, options, :last, :first, prompt: true %>"
  end
  # END ASSOC INPUTS
end