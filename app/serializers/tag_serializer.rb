class TagSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :category
end
