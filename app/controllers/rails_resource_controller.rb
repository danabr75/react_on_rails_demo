class RailsResourceController < ApplicationController
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
    sleep(0.1)
  end
end
