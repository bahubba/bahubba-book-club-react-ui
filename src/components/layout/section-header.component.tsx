import { useState } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material';

// MUI styled components
const SectionHeaderDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: theme.spacing(4.5)
}));

const HiddenContentDiv = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  paddingLeft: theme.spacing(0.5)
}));

// Component props
interface SectionHeaderProps {
  title: string;
  typographyVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2';
  justifyChildren?: 'flex-start' | 'flex-end' | 'center';
  children?: JSX.Element | JSX.Element[];
}

/**
 * Header for a section of a sectioned page, with children hidden until hovered over
 * @prop {string} title - Title of the section
 * @prop {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [typographyVariant='h5'] - Typography variant for the title
 * @prop {'flex-start' | 'flex-end' | 'center'} [justifyChildren='flex-end'] - How to justify the children
 * @prop {JSX.Element | JSX.Element[]} children - Children to display when hovered over
 */
const SectionHeader = ({
  title,
  typographyVariant = 'h5',
  justifyChildren = 'flex-end',
  children
}: SectionHeaderProps) => {
  // State vars
  const [hover, setHover] = useState(false);

  // Event handlers
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  return (
    <SectionHeaderDiv
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Typography variant={typographyVariant}>{title}</Typography>
      <HiddenContentDiv style={{ justifyContent: justifyChildren }}>
        {hover && children}
      </HiddenContentDiv>
    </SectionHeaderDiv>
  );
};

export default SectionHeader;
