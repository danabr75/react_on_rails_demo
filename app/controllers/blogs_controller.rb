class BlogsController < CrudController
  respond_to :html
  layout "management_application"
  include CanCanCan::AbstractResourceController

  RESOURCE_INDEX_ATTRIBS = [:title]
end
