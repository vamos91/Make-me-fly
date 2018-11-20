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
      redirect_to user_path(current_user), notice: 'appareil ajouté.'
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
      redirect_to user_path(current_user), notice: 'Appareil modifié avec succès'
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
    params.require(:aeronef).permit(:aeronef_category, :cylindre, :annee, :vitesse, :equipement, :autonomie, :marque, :modele, :photos, :image_1, :image_2, :image_3, :image_4,:photos_cache, :image_1_cache, :image_2_cache, :image_3_cache, :image_4_cache)
  end

  def find_aeronef
    @aeronef = Aeronef.find(params[:id])
  end

end
