class UsersController < ApplicationController
  skip_before_action :authorize, only: :create

  def index
    users = User.all.with_attached_image
    render json: users
  end

  def show
    user = User.find_by(id: session[:user_id])
    render json: user
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :accepted
  end

  def update
    user = User.find_by(id: session[:user_id])
    user.update!(user_params)
    render json: user
  end

  private

  def user_params
    params.permit(:id, :username, :display_name, :password, :type, :image)
  end
end
