set :stage, "staging"
set :branch, "master"
server '62.4.23.76', user: fetch(:ssh_user), roles: %w{web app db}

set :npm_env_variables, {'ENV' => 'staging'}
set :npm_flags, '--production --silent --no-progress' # default
