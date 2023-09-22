class Api::V1::ApiAbstractController < ApplicationController
  include CanCanCan::AbstractResourceController
  before_action :slow_down_dev_env, if: -> { Rails.env.development? }

  def meta
    authorize! :index, @resource_class
    render json: {
      total_count: @resource_class.count
    }, status: :ok
  end

  protected

  def slow_down_dev_env
    sleep(0.5)
  end

  def respond_with_resources
    page     = params[:page]&.to_i || 1
    per_page = params[:per_page]&.to_i || 10
    offset   = per_page * (page - 1)
    @resources = @resources.limit(per_page).offset(offset)
    super
  end
end
