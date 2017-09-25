class AeronefsController < ApplicationController

  def index
    @aeronef = policy_scope(Aeronef)
    authorize @aeronef
  end

  def new
    @aeronef = current_user.aeronefs.build
    authorize @aeronef
  end

  def create
    @aeronef = current_user.aeronefs.build(aeronef_params)
    authorize @aeronef
    if @aeronef.save
      redirect_to root_path, notice: 'appareil ajouté.'
    end
  end

  def show
    find_aeronef
    authorize @aeronef
  end

  def edit
    find_aeronef
    authorize @aeronef
  end

  def update
    find_aeronef
    authorize @aeronef
    @aeronef.update(aeronef_params)
    if @aeronef.save
      redirect_to user_path, notice: 'Appareil modifié avec succès'
    else
      render :edit
    end
  end

  def destroy
    find_aeronef
    authorize @aeronef
    @aeronef.destroy
    redirect_to user_path, notice: 'Appareil effacée avec succès'
  end

  private

  def aeronef_params
    params.require(:aeronef).permit(:aeronef_category, :cylindre, :annee, :photo, :photo_cache, :vitesse, :equipement, :autonomie, :marque, :modele)
  end

  def find_aeronef
    @aeronef = Aeronef.find(params[:id])
  end

end
