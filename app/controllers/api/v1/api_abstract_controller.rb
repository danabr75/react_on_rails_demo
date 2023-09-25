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
    sleep(0.1)
  end

  def respond_with_resources
    @resources = @resources.paginate(page: params[:page]&.to_i, per_page: params[:per_page]&.to_i || 10)
    attempted_serializer_name = "#{@resource_class}Serializer"
    if Object.const_defined?(attempted_serializer_name)
      @resources = attempted_serializer_name.constantize.new(@resources, { is_collection: true }).serializable_hash.to_json
    end
    super
  end

  def respond_with_resource
    attempted_serializer_name = "#{@resource_class}Serializer"
    if Object.const_defined?(attempted_serializer_name)
      @resource = attempted_serializer_name.constantize.new(@resource, { is_collection: false }).serializable_hash.to_json
    end
    super
  end
end
