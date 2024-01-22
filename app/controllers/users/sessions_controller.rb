# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  clear_respond_to
  respond_to :json, :html
  layout "devise_application"
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  private

  # Would be used if we could get devise api token working
  # def respond_with(resource, _opts = {})
  #   render json: {
  #     message: 'Logged in successfully',
  #     data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
  #   }, status: :ok
  # end

  # Would be used if we could get devise api token working
  # def respond_to_on_destroy
  #   if current_user
  #     render json: {
  #       message: 'logged out successfully'
  #     }, status: :ok
  #   else
  #     render json: {
  #       message: "Couldn't find an active session."
  #     }, status: :unauthorized
  #   end
  # end
end
