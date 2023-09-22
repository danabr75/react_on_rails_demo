class BlogSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :body, :platform_tags_limited, :genre_tags, :uncategorized_tags

  has_many :platform_tags_limited, serializer: TagSerializer

  has_many :tags, serializer: TagSerializer

  # WORKS!
  # has_many :tags, serializer: TagSerializer
  # WORKS!
  # has_many :tags, through: :blogs_tags, serializer: TagSerializer

  # has_one :genre, record_type: :tag

  attribute :body_limited do |object|
    object.body&.truncate(255)
  end

end
