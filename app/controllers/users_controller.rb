class UsersController < ApplicationController
  skip_before_action :authorize, only: :create

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find_by(id: session[:user_id])
    render json: user
  end

  def create
    new_user = User.create!(user_params)
    render json: new_user, status: :accepted
  end

  def update
    user = User.find_by(params[:id])
    user.update!(update_user_params)
    render json: user
  end

  private

  def update_user_params
    params.permit(:display_name, :avatar, :username)
  end

  def user_params
    params.permit(:id, :username, :display_name, :password, :type)
  end
end
