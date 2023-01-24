class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def index
    users = User.all
    render json: users
  end

  def show
    render json: @current_user
  end

  def create
    new_user = User.create(user_params)
    if new_user.valid?
      session[:new_user] = new_user.id
      render json: new_user, status: :created
    else
      render json: { errors: ["user_data_invalid"] }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:id, :username, :display_name, :password, :type)
  end
end
