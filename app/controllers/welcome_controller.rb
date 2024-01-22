class WelcomeController < ApplicationController
  respond_to :html
  layout "application", only: :index

  def index
  end

  def admin_index
    if current_user
      render :admin_index, layout: 'management_application'
    else
      redirect_to root_path
    end
  end
end
