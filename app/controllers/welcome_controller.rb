class WelcomeController < ApplicationController
  respond_to :html
  # before_action :authenticate_user!, except: [:index]
  layout "management_layout", only: :admin_index
  layout "application", only: :index

  def index
  end

  def admin_index
    if current_user
      super
    else
      render :unauthorized
    end
  end
end
