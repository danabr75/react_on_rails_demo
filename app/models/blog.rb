class Blog < ApplicationRecord
  # include Elasticsearch::Model
  # include Elasticsearch::Model::Callbacks
  searchkick

  has_many :blogs_tags
  has_many :tags, through: :blogs_tags, source: :tag

  # We'd like to make this a :has_one association, but rails does not support.
  has_many :platform_tags, -> { where(category: 'platform') }, through: :blogs_tags, source: :tag
  has_many :platform_tags_limited, -> { where(category: 'platform').limit(1) }, through: :blogs_tags, source: :tag

  has_many :genre_tags, -> { where(category: 'genre') }, through: :blogs_tags, source: :tag

  has_many :uncategorized_tags, -> { where(category: nil) }, through: :blogs_tags, source: :tag

  scope :order_by_created_desc, -> { order(created_at: :desc) }

  def self.full_search options = {}
    options ||= {}
    query = where({})


    # Tag Search
    # Must match one
    # if options[:tag_ids].present?
    #   query = query.joins(:blogs_tags).where(blogs_tags: { tag_id: options[:tag_ids] })
    # end
    # Must match all
    if options[:tag_ids].present?
      filter_query = query.joins(:tags)
        .where(tags: { id: options[:tag_ids] })
        .group(:id)
        .having("COUNT(DISTINCT tags.id) = ?", options[:tag_ids].length)
      query = query.where(id: filter_query)
    end


    # Attrib search (must be at END of other search params)
    if options[:text].present?
      searchkick_search = Blog.search(
        options[:text],
        where: {id: query.pluck(:id)},
        fields: [:title, :body]
      )
      return searchkick_search
    end

    return query
  end

  protected

  def validate_only_one_platform
    if platform_tags.size > 1
      errors.add(:platform_tags, "can only have one platform")
    end
  end
end
