import React from "react";
import { Button, TextField } from "@material-ui/core";
import './UploadImage.scss';
import { getUser } from '../../lib/userData/manager';
import Gallery from "../Gallery/Gallery";
// import { Update } from "@material-ui/icons";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '', name: '', imgs: getUser().images };
    this.UpdateImg = this.UpdateImg.bind(this);
  }

  UpdateImg() {
    //this.setState({ imgs: getUser().images });
    return this.state.imgs;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("uploading", this.state.file);
    if (this.state.imagePreviewUrl.search(/^data:image\//g) !== -1 || this.state.imagePreviewUrl !== "" || this.state.name !== "") {
      console.log(this.state.name);
      getUser().uploadImage(this.state.name, this.state.imagePreviewUrl, (err) => {
        if (err) {
          console.log(err);
        }
      });
      console.log(this.state.name, this.state.imagePreviewUrl);
    }
  }

  handleImageChange(e) {

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      }); console.log(this.state.imagePreviewUrl.search(/^data:image\//g))
    }; console.log(this.state.imagePreviewUrl);
    reader.readAsDataURL(file);
    this.setState({ imgs: getUser().images })

  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value,
    });
  }

  handleImageChangeUrl = event => {
    console.log("url");
    this.setState({
      imagePreviewUrl: event.target.value,
    });
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl.search(/^data:image\//g) !== -1) {
      $imagePreview = <img src={imagePreviewUrl} alt='not-found' />;
    } else if (imagePreviewUrl === '') {
      $imagePreview = (
        <div className="uploadimage__previewText">Veuillez selectionner une image pour l'aperçu</div>
      );
    }
    else {
      $imagePreview = (
        <div className="uploadimage__errorText">Format d'image invalide</div>
      );
    }

    return (
      <div className="uploadimage">
        <form onSubmit={e => this.handleSubmit(e)}>
          <Button className="uploadimage__submit" variant="contained" component="label">
            Choisir Image
            <input
              className="uploadimage__input"
              type="file"
              style={{ display: "none" }}
              onChange={e => this.handleImageChange(e)}
            />
          </Button>
          <TextField className="uploadimage__textfield" variant="outlined" label="Url image" onChange={this.handleImageChangeUrl}></TextField>
          <TextField className="uploadimage__textfield" variant="outlined" label="Nom image" required value={this.state.name} onChange={this.handleNameChange}></TextField>
          <Button
            variant="contained"
            className="uploadimage__submit"
            type="submit"
            onClick={e => this.handleSubmit(e)}
            >Upload Image
          </Button>
        </form>
        <div className="uploadimage__preview">{$imagePreview}</div>
        <Gallery imgs={this.UpdateImg()} className="Gallery"></Gallery>
      </div>
    );
  }
}

export default ImageUpload;