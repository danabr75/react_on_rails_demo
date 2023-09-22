class Blog < ApplicationRecord
  # has_many :blogs_tag
  # has_and_belongs_to_many :tags
  # has_one :platform, -> { where(category: 'platform') }, through: :blogs_tag, source: :tag, class_name: 'Tag'
  # has_one :genre, -> { where(category: 'genre') }, class_name: 'Tag'
  # accepts_nested_attributes_for :tags

  has_many :blogs_tags
  has_many :tags, through: :blogs_tags, source: :tag

  # We'd like to make this a :has_one association, but rails does not support.
  has_many :platform_tags, -> { where(category: 'platform') }, through: :blogs_tags, source: :tag
  has_many :platform_tags_limited, -> { where(category: 'platform').limit(1) }, through: :blogs_tags, source: :tag

  has_many :genre_tags, -> { where(category: 'genre') }, through: :blogs_tags, source: :tag

  has_many :uncategorized_tags, -> { where(category: nil) }, through: :blogs_tags, source: :tag

  protected

  def validate_only_one_platform
    if platform_tags.size > 1
      errors.add(:platform_tags, "can only have one platform")
    end
  end
end
