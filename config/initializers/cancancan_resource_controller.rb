require "cancancan_resource_controller"
# default values shown
CanCanCan::NestedAssignmentAndAuthorization.configure do |config|
  # Allows for stopping unauthorized actions without raising errors
  # - Will let root object (and valid, other nested objects) save, even if an invalid nested object exists, if true
  config.silence_raised_errors = false
  # Auto-determine what action to auth on nested associations (:create, :update, :destroy)
  # - :create if is a new record
  # - :update if pre-existing record
  # - :destroy if :_destroy parameter is present
  # - will use the action of the root object if set to false
  config.use_smart_nested_authorizations = true
end