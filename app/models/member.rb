class Member < ApplicationRecord
  scope :public_view, -> { where(public: true) }
  scope :ordered, -> { order(ordering: :asc) }

  has_one_attached :avatar

  # Override the initialize method
  def initialize(*args)
    super(*args)
    self.ordering = Member.maximum(:ordering) + 1 if self.ordering.nil?
  end
end
