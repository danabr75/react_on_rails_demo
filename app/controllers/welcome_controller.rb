class WelcomeController < ApplicationController
  respond_to :html
  # before_action :authenticate_user!, except: [:index]
  def index
  end
end
