class Tag < ApplicationRecord
  # has_many :blogs_tags
  # has_and_belongs_to_many :blogs, through: :blogs_tags
  # has_and_belongs_to_many :blogs
  CATEGORIES = %w[platform genre] << nil
  validates :category, inclusion: { in: CATEGORIES }

  # future-proofing, in event that blog tags became more narrow than all
  scope :blog_applicable, -> {}

  def self.populate
    init_data = [
      ["PC", "platform"],
      ["PlayStation", "platform"],
      ["First Person Shooter", "genre"],
      ["Top Down", "genre"],
    ] 
    init_data.each do |name, category|
      Tag.find_or_create_by!(name: name, category: category)
    end
  end
end
