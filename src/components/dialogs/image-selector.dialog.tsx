import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  ImageList,
  ImageListItem,
  styled
} from '@mui/material';
import _ from 'lodash';

import { Image } from '../../interfaces';

// MUI styled components
interface SelectableImageListItemProps {
  selected: boolean;
}

const SelectableImageListItem = styled(ImageListItem, {
  shouldForwardProp: prop => !_.isEqual(prop, 'selected')
})<SelectableImageListItemProps>(({ theme, selected }) =>
  selected
    ? {
        padding: theme.spacing(0.25),
        border: `${theme.spacing(1)} solid ${theme.palette.primary.light}`,
        borderRadius: theme.spacing(1)
      }
    : { cursor: 'pointer' }
);

// Component props
interface ImageSelectorDialogProps extends DialogProps {
  images: Image[];
  selectedImage: Image;
  setSelectedImage: React.Dispatch<React.SetStateAction<Image>>;
  handleClose: () => void;
}

/**
 * Dialog for selecting an image
 * @prop {Image[]} images List of images to select from
 * @prop {Image} selectedImage Currently selected image
 * @prop {React.Dispatch<React.SetStateAction<Image>>} setSelectedImage Callback for setting the selected image
 * @prop {() => void} handleClose Callback for closing the dialog
 * @prop {...DialogProps} dialogProps Passthrough props for the MUI Dialog component
 */
const ImageSelectorDialog = ({
  images,
  selectedImage,
  setSelectedImage,
  handleClose,
  ...dialogProps
}: ImageSelectorDialogProps) => {
  // Handle selecting an image
  const handleSelectImage = (event: React.MouseEvent<HTMLLIElement>) => {
    setSelectedImage(images[parseInt(_.get(event, 'currentTarget.id[0]'))]);
  };

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>Select an Image</DialogTitle>
      <DialogContent>
        <ImageList
          variant="masonry"
          cols={3}
          gap={12}
        >
          {_.map(images, (image, index) => (
            <SelectableImageListItem
              id={`${index}-${image.fileName}-image-list-item`}
              key={image.fileName}
              selected={_.isEqual(image.fileName, selectedImage?.fileName)}
              onClick={handleSelectImage}
            >
              <img
                src={image.url}
                alt={image.fileName}
              />
            </SelectableImageListItem>
          ))}
        </ImageList>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageSelectorDialog;
