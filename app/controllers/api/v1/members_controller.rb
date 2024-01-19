class Api::V1::MembersController < Api::V1::ApiAbstractController
  def public_index
    puts "IS USER LOGGED IN?: #{@current_user.present?}"
    authorize! :public_index, @resource_class
    @resources = @resource_class.public_view.ordered
    @resources = MemberSerializer.new(@resources, { is_collection: true }).serializable_hash.to_json
    render json: @resources, status: :ok
  end
end
