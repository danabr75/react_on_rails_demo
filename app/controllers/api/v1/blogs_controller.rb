class Api::V1::BlogsController < ApplicationController
  include CanCanCan::AbstractResourceController

  def index
    # necessary to simulate production environment.
    # - loading spinner looks glitchy otherwise
    sleep(0.5) if Rails.env.development?
    super
  end

  def meta
    authorize! :index, Blog
    render json: {
      total_count: Blog.count
    }, status: :ok
  end

  protected

  def respond_with_resources
    page     = params[:page]&.to_i || 1
    per_page = params[:per_page]&.to_i || 10
    offset   = per_page * (page - 1)
    @resources = @resources.limit(per_page).offset(offset)
    super
  end
end
