// This goes in components, because these items are going to be displayed in multiple pages
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography, useTheme, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../theme';
import { addToCart } from '../state';
import { useNavigate } from 'react-router-dom';

const Item = ({item, width }) => { //this item parameter comes from the backend
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1); //this represents the number of items that we are going to add to the cart
    const [isHovered, setIsHovered] = useState(false);
    const { 
        palette: { neutral },
    } = useTheme();

    const { category, price, name, image } = item.attributes;
    const {
        data: {
            attributes: {
                formats: {
                    medium: { url } //grabbing the image that is medium sized 
                }
            }
        }
    } = image;

    return (
        <Box width={width}>
            <Box 
                position="relative" 
                onMouseOver={() => setIsHovered(true)} 
                onMouseOut={() => setIsHovered(false)}
                >
                    <img
                        alt={item.name}
                        width="300px"
                        height="400px"
                        src={`http://localhost:1337${url}`}
                        onClick={() => navigate(`/item/${item.id}`)} //the item details page
                        style={{ cursor: 'pointer' }}
                    />
                    <Box
                        display={isHovered ? "block" : 'none'} //plus and minus buttons
                        position="absolute"
                        bottom="10%"
                        left="0"
                        width="100%"
                        padding="0 5%"
                    >
                        <Box display="flex" justifyContent="space-between">
                            {/* Amount */}
                            <Box 
                                display="flex" 
                                alignItems="center" 
                                backgroundColor={shades.neutral[100]} 
                                borderRadius="3px"
                            >
                                <IconButton
                                    onClick={() => setCount(Math.max(count - 1, 1))} //make sure count doesn't go below one
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Typography color={shades.primary[300]}>{count}</Typography>
                                <IconButton
                                    onClick={() => setCount(count + 1)}
                                >
                                    <AddIcon />
                                </IconButton>  
                            </Box>
                            {/* Button */}
                            <Button
                                onClick={() => { 
                                    dispatch(addToCart({ item: {...item, count } }))
                                }}
                                sx = {{ backgroundColor: shades.neutral[700], color: "white" }}
                            >
                                Add to Cart 
                            </Button>
                        </Box>
                    </Box>
            </Box>

            <Box mt="3px">
                <Typography variant="subtitle2" color={neutral.dark}>
                    {category.replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())} {/* Regex = giving us our category, and we are replacing the values and capitalizing the first letter*/}
                </Typography>
                <Typography>{name}</Typography>
                <Typography fontWeight="bold">{`$${price}`}</Typography>
            </Box>
        </Box>
    );

};

export default Item;