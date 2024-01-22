class User < ApplicationRecord
  # # refresh did not work
  # for when users are reloaded
  # after_find :refresh_cached_variables
  # def reload(*)
  #   super.tap do
  #     refresh_cached_variables
  #   end
  # end

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable

  has_many :user_roles
  has_many :roles, through: :user_roles

  accepts_nested_attributes_for :user_roles, allow_destroy: true

  def role_names
    @_role_names ||= roles.map(&:name).collect{ |v| v.to_sym }
  end

  def current_ability
    @current_ability ||= Ability.new(self)
  end

  def can? *args
    current_ability.can?(*args)
  end

  def cannot? *args
    current_ability.cannot?(*args)
  end


  # # Override the initialize method
  # def initialize(*args)
  #   super(*args)
  #   self.email = 'default_value' if !self.email.present?
  # end

  private

  # def refresh_cached_variables
  #   puts "refresh_cached_variables"
  #   @_role_names = nil
  # end
end
