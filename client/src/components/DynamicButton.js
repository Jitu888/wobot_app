import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const CustomButton = styled(Button)(({ theme, btnColor="red", bgColor }) => ({
  backgroundColor: (btnColor === "Active" ?"#D0FFBC" : "#BDBDBD") || theme.palette.primary.main,
  color: (btnColor === "Active" ?"green" : "grey")  || theme.palette.primary.contrastText,
  transition: 'all 0.3s ease',
  padding: '2px 12px',
  fontSize: '0.35rem',
  fontWeight:700,
  textTransform: 'capitalize',

  '&:hover': {
    backgroundColor: bgColor ,
  },

  [theme.breakpoints.down('xs')]: {
    fontSize: '0.3rem',
    padding: '4px 8px',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '0.4rem',
    padding: '6px 12px',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '0.5rem',
    padding: '7px 14px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '0.35rem',
    padding: '8px 16px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '0.7rem',
    padding: '6px 12px',
  },
}));

const DynamicButton = ({ name = 'Click Me', btnColor, bgColor,onClick }) => {
  return (
    <CustomButton
      btnColor={btnColor}
      bgColor={bgColor}
      onClick={onClick}
    >
      {name}
    </CustomButton>
  );
};

export default DynamicButton;
