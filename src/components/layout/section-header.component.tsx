import { useState } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material';

// MUI styled components
const SectionHeaderDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: theme.spacing(4.5)
}));

const HiddenContentDiv = styled('div')({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'flex-end'
});

// Component props
interface SectionHeaderProps {
  title: string;
  children?: JSX.Element | JSX.Element[];
}

/**
 * Header for a section of a sectioned page, with children hidden until hovered over
 * @prop {string} title - Title of the section
 * @prop {JSX.Element | JSX.Element[]} children - Children to display when hovered over
 */
const SectionHeader = ({ title, children }: SectionHeaderProps) => {
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
      <Typography variant="h5">{title}</Typography>
      <HiddenContentDiv>{hover && children}</HiddenContentDiv>
    </SectionHeaderDiv>
  );
};

export default SectionHeader;
