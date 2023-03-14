import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InfoIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';
import ClassIcon from '@mui/icons-material/Class';
import ConstructionIcon from '@mui/icons-material/Construction';
import SearchIcon from '@mui/icons-material/Search';


export function PageFrame({onSideMenuClick}: { onSideMenuClick: () => void }, ) {
    return <div>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={onSideMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            EL - Vocabulary
          </Typography>

        </Toolbar>
      </AppBar>

    
    </div>
}

export function SideMenu({showSideMenu, onClose}: { showSideMenu: boolean, onClose: () => void }) {
  return <Drawer open={showSideMenu} onClose={onClose}>
    <Box width={250}>
      <List>
        <ListItem disablePadding>
          <ListItemButton >
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            
            <ListItemText primary='Account'/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton href='/vocabulary/vocabulary.html'>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            
            <ListItemText primary='Vocabulary'/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton href='/vocabulary/query/query.html'>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            
            <ListItemText primary='Word Search'/>
          </ListItemButton>
        </ListItem>

      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton href='/vocabulary/tests/ab.html'>
            <ListItemIcon>
              <QuizOutlinedIcon />
            </ListItemIcon>

            <ListItemText primary='AB Test'/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton >
            <ListItemIcon>
              <QuizOutlinedIcon />
            </ListItemIcon>

            <ListItemText primary='Spelling Test'/>
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => window.location.assign('https://github.com/996icu/996.ICU')}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            
            <ListItemText primary='Anti-996'/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => window.location.assign('https://github.com/Lama3L9R/el-web')}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            
            <ListItemText primary='Source Code'/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            
            <ListItemText primary='About'/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  </Drawer>
}