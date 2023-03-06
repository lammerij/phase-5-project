class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
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
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :accepted
    else
      render json: { error: ["user_data_invalid"] }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find_by(id: session[:user_id])
    user.update!(update_params)
    render json: user
  end

  private

  def update_params
    params.permit(:id, :username, :display_name, :password, :type, :image)
  end

  def user_params
    params.permit(:id, :username, :display_name, :password, :type, :image)
  end
end
