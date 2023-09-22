class Tag < ApplicationRecord
  # has_many :blogs_tags
  # has_and_belongs_to_many :blogs, through: :blogs_tags
  # has_and_belongs_to_many :blogs
  CATEGORIES = %w[platform genre] << nil
  validates :category, inclusion: { in: CATEGORIES }
end
