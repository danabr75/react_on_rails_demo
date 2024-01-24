class Api::V1::SponsorsController < Api::V1::ApiAbstractController
  def public_index
    authorize! :public_index, @resource_class
    @resources = @resource_class.public_view.ordered
    @resources = SponsorSerializer.new(@resources, { is_collection: true }).serializable_hash.to_json
    render json: @resources, status: :ok
  end
end
