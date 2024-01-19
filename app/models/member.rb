class Member < ApplicationRecord
  scope :public_view, -> { where(public: true) }
  scope :ordered, -> { order(ordering: :asc) }

  has_one_attached :avatar
end
