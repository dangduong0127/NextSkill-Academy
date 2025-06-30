import "./styles.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
type props = {
  status: boolean;
};

const MenuMobile = ({ status }: props) => {
  return (
    <div className="menu-mobile" style={{ display: status ? "flex" : "none" }}>
      <Button component={Link} to={"/"} color="inherit">
        Home
      </Button>
      <Button component={Link} to={"/about"} color="inherit">
        About
      </Button>
      <Button
        color="inherit"
        // aria-controls={anchorEl ? "member-menu" : undefined}
        aria-haspopup="true"
        // aria-expanded={anchorEl ? "true" : undefined}
        // onMouseEnter={handleOpen}
      >
        Member
      </Button>
      {/* <Menu
        id="member-menu"
        // anchorEl={anchorEl}
        // open={!!anchorEl}
        // onClose={handleClose}
        // MenuListProps={{
        //   onMouseEnter: () =>
        //     clearTimeout(hoverTimeout.current as ReturnType<typeof setTimeout>),
        //   onMouseLeave: handleClose,
        // }}
        // anchorOrigin={{
        //   vertical: "bottom",
        //   horizontal: "left",
        // }}
        // transformOrigin={{
        //   vertical: "top",
        //   horizontal: "left",
        // }}
        // // Thêm để cải thiện UX
        // disableScrollLock={true}
        // slotProps={{
        //   paper: {
        //     sx: {
        //       marginTop: "5px",
        //       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        //     },
        //   },
        // }}
      >
        <MenuItem component={Link} to="/web-development">
          Web Development
        </MenuItem>
        <MenuItem component={Link} to="/mobile-apps">
          Mobile Apps
        </MenuItem>
        <MenuItem component={Link} to="/ui-ux-design">
          UI/UX Design
        </MenuItem>
      </Menu> */}

      <Button component={Link} to={"/events"} color="inherit">
        Events
      </Button>
      <Button component={Link} to={"/blogs"} color="inherit">
        Blogs
      </Button>
      <Button component={Link} to={"/contact"} color="inherit">
        Contact
      </Button>
    </div>
  );
};

export default MenuMobile;
