import { Box, Grid, Paper } from "@mui/material";
import { useState } from "react"

type Props = {
    images : string[]
}
export default function ProductDetailsMainSectionImage({images} :Props) {
    const [mainImage, setMainImage] = useState(images.length>0? images[0]: '');

    const handleThumbnailHover = (image : string) =>{
        setMainImage(image)
    }
  return (
    <Grid container spacing={2}>
        <Grid size={1}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                {images.map((image, index) => (
                    <Paper key={index} elevation={1} 
                    sx={{
                        width: '100%',
                        aspectRatio: '1/1',
                        cursor:'pointer',
                        border: image === mainImage? '2px solid #1976d2' : '2px solid transparent',
                        overflow: 'hidden',
                        transition: 'border 0.2s ease',
                        '&:hover' : {
                            border: '2px solid #1975d2',
                        }
                    }}
                    onMouseEnter={() => 
                        handleThumbnailHover(image)
                    }
                    >
                        <Box
                            component="img"
                            src={image}
                            alt={image}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit:'contain'
                            }}
                        >
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Grid>

        {/* MAIN IMAGE */}
        <Grid size={11}>
            <Paper
            elevation={2}
            sx={{
                width:'100%',
                height: '600px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'secondary.main',
                overflow: 'hidden'
            }}
            >
                <Box
                    component="img"
                    src={mainImage}
                    alt="Product Main Image"
                    sx={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        transition: 'all 0.3s ease'
                    }}
                />           
            </Paper>
        </Grid>
    </Grid>
  )
}