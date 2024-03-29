class SocialSerializer
  include JSONAPI::Serializer

  attributes :name, :external_url

  # attribute :full_name do |object|
  #   [object.first_name, object.last_name].map(&:to_s).join(' ')
  # end

  attribute :avatar_url do |object|
    object.avatar.url if object.avatar.attached?
  end
end
