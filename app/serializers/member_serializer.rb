class MemberSerializer
  include JSONAPI::Serializer

  attribute :full_name do |object|
    [object.first_name, object.last_name].map(&:to_s).join(' ')
  end
end
