class UserRole < ApplicationRecord
  belongs_to :user
  belongs_to :role

  def name
    role&.name
  end
end
