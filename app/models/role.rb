class Role < ApplicationRecord
  # Define an enumerable list of role names
  enum valid_names: [:admin, :moderator, :user]

  # Validate that the name is present and included in the enumerable list
  validates :name, presence: true, inclusion: { in: Role.valid_names.keys }, uniqueness: true

  has_many :users
end
