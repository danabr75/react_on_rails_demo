class Api::V1::BlogsController < Api::V1::ApiAbstractController
  # before_action :index_dev, if: -> { Rails.env.development? }


  def meta
    authorize! :index, @resource_class
    render json: {
      total_count: @resource_class.search(params[:search]).count,
      tags: TagSerializer.new(Tag.blog_applicable, { is_collection: true }).serializable_hash[:data].collect{ |v| v[:attributes] },
    }, status: :ok
  end

  # def index_dev
  #   Blog.__elasticsearch__.create_index!
  #   Blog.import
  # end

  protected

  def index_resource_query resource_query
    resource_query = resource_query.search(params[:search])
    # resource_query = resource_query.includes(:tags)
    resource_query = resource_query.order_by_created_desc
    return resource_query
  end
end
