class CausesController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def index
    causes = Cause.all.with_attached_image
    render json: causes
  end

  def show
    causes = Cause.find_by(id: params[:id])
    render json: causes
  end

  def create
    user = User.find_by(id: session[:user_id])
    new_cause = user.causes.create!(cause_params)
    render json: new_cause, status: :created
  end

  def update
    cause = Cause.find_by(id: params[:id])
    cause.update!(cause_params)
    render json: cause
  end

  def destroy
    user = User.find_by(id: session[:user_id])
    cause = user.causes.find_by(id: params[:id])
    if cause
      cause.destroy
    else
      render json: { error: "Cannot Delete Cause You Did Not Organize!" }, status: :unprocessable_entity
    end
  end

  private


  def cause_params
    params.permit(:name, :organization, :description, :number_of_donations, :amount_raised, :amount_needed, :time_remaining, :image)
  end
end
