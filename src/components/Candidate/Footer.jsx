import * as React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';

export default function Footer() {
    return (
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, marginTop: 10 }}>
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' component='div'>
                About us
              </Typography>
              <Typography variant='body1' component='div'>
                We are a leading job search website, providing thousands of job opportunities to job
                seekers across the country.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant='h6' component='div'>
                Jobs locations
              </Typography>
              <Box sx={{ paddingLeft: 1, paddingTop: 0, marginTop: 0 }}>
                <Typography variant='body2'>Hà Nội</Typography>
                <Typography variant='body2'>Hồ Chí Minh</Typography>
                <Typography variant='body2'>Bình Dương</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant='h6' component='div'>
                Career
              </Typography>
              <Box sx={{ paddingLeft: 1, paddingTop: 0, marginTop: 0 }}>
                <Typography variant='body2'>Công nghệ thông tin</Typography>
                <Typography variant='body2'>Marketing</Typography>
                <Typography variant='body2'>Sale</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' component='div'>
                Contact
              </Typography>
               <Box sx={{ paddingLeft: 1, paddingTop: 0, marginTop: 0 }}>
                <Typography variant='body2'>Address: Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Thành phố Hồ Chí Minh</Typography>
                <Typography variant='body2'>Phone: 0123456789</Typography>
                <Typography variant='body2'>Email: info@example.com</Typography>
              </Box>

              {/* QR code */}
            </Grid>
            {/* QR code */}
    
          </Grid>
        </Container>
      </Box>
    );
}
