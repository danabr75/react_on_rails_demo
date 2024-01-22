# extendable into multiple files
Dir[Rails.root.join('app', 'abilities', '*.rb')].each { |f| require f }

class Ability
  include CanCan::Ability
  # include CanCanCanJs::Export

  MODEL_ABILITIES = Dir[Rails.root.join('app', 'abilities', '*.rb')]
  MODEL_ABILITIES.each { |f| require f }

  # We now have the active_account object that we can check for general permission checks.
  # The active_account parameter is for export only to the front-end, and has no bearing on back-end authorization.
  def initialize(user = nil, active_account = nil)
    user ||= User.new # guest user (not logged in)

    # can :update, User, [:email, :role], {role: [nil, '']}

    if user.role_names.include?(:admin)
      can(:manage, User, [
       :role_ids,
       :email,
      ])
      can :manage, Role
      can :manage, UserRole
    end

    can :index, Blog
    can :public_index, Member

    # MODEL_ABILITIES.each do |filename|
    #   module_klass = File.basename(filename, '.rb').camelize.constantize

    #   ability_block = module_klass.permissions
    #   # Calls the permissions from the returned Proc object.
    #   # - Passes 'user' as a parameter
    #   # - inside proc, 'self' is the ability instance.
    #   #   - allows us to write the 'can' methods, in the modules, exactly as they would be written here.
    #   # - src: https://stackoverflow.com/questions/2759210/invoking-proc-with-instance-eval-with-arguments
    #   instance_exec(user, &ability_block)
    # end
  end

  # Had issues with CanCan being passed a string, which does not equate to a sym.
  # Patching it here
  def can? *args
    args[0] = args[0].to_sym if args[0].present? && !args[0].is_a?(Symbol)
    super(*args)
  end
end
