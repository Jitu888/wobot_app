import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Paper,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import DynamicButton from "./components/DynamicButton";
import { fetchData, postData } from "./services/apicall";
import CloudIcon from "@mui/icons-material/Cloud";
import Circle from "./components/Circle";
import splitIcon from "./utils/a.png";
import SmallPointer from "./components/SmallPointer";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { ExpandMore } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import CustomTablePaginationActions from "./components/CustomTablePaginationActions";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [locationFilter, setLocationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [data, setData] = useState([]);

  const fetchDataFromApi = async () => {
    try {
      const result = await fetchData("fetch/cameras");
      console.log("result", result);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateStatus = async (id, status) => {
    const checkstatus = status === "Active" ? "Inactive" : "Active";
    const body = { id, status: checkstatus };
    try {
      const result = await postData("update/camera/status", body);
      if (result.status === 200) {
        fetchDataFromApi();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const locationFilterData = data.map((obj) => {
    return obj.location;
  });

  const locations = [...new Set(locationFilterData)];

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(data.map((row, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const removeRowFromTable = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
  };

  const filteredData = data
    .filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    )
    .filter((row) =>
      locationFilter && locationFilter !== "All"
        ? row.location === locationFilter
        : true
    )
    .filter((row) =>
      statusFilter && statusFilter !== "All"
        ? row.status === statusFilter
        : true
    );

  const isSelected = (id) => selectedRows.includes(id);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <Box className="mainDiv">
      <Box
        className="titleBox"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box>
          <Typography variant="h3">Cameras</Typography>
          <Typography variant="h6" style={{ color: "gray" }}>
            Manage your cameras here
          </Typography>
        </Box>
        <Box>
          <TextField
            label="Search"
            variant="filled"
            shrink={false}
            value={searchText}
            onChange={handleSearchChange}
            sx={{
              width: 300,
              backgroundColor: "lightgray",
              "& .MuiFilledInput-root": {
                backgroundColor: "lightgray",
                "&:before": {
                  borderBottom: "none",
                },
                "&:after": {
                  borderBottom: "none",
                },
                "&:hover:before": {
                  borderBottom: "none",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Paper sx={{ width: "100%", padding: 0 }}>
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <Box display="flex" gap="30px" style={{ padding: "10px 0 0 20px" }}>
            <FormControl variant="outlined" sx={{ width: 300 }}>
              <InputLabel>Location</InputLabel>
              <Select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                label="Location"
                IconComponent={(props) => (
                  <ExpandMore {...props} sx={{ color: "blue", fontSize: 25 }} />
                )}
                sx={{
                  height: "45px",
                  "& .MuiSelect-select": {
                    paddingRight: "32px",
                    backgroundColor: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                {locations.map((city) => (
                  <MenuItem value={city}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ width: 250 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                IconComponent={(props) => (
                  <ExpandMore {...props} sx={{ color: "blue", fontSize: 25 }} />
                )}
                sx={{
                  height: "45px",
                  "& .MuiSelect-select": {
                    paddingRight: "32px",
                    backgroundColor: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box style={{ height: "2px", backgroundColor: "#ebe6e6" }}></Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < filteredData.length
                    }
                    checked={
                      filteredData.length > 0 &&
                      selectedRows.length === filteredData.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>HEALTH</TableCell>
                <TableCell>LOCATION</TableCell>
                <TableCell>RECORDER</TableCell>
                <TableCell>TASKS</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                        }}
                      >
                        <SmallPointer color={row.current_status} />
                        {row.name}
                        {row.status === "Inactive" &&
                          row.current_status === "Online" && (
                            <ErrorOutlineIcon sx={{ color: "orange" }} />
                          )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CloudIcon
                          style={{ fillOpacity: "0.2", marginRight: "3px" }}
                        />
                        {row.health.cloud && (
                          <Circle
                            percentage={row.health.cloud}
                            color1={
                              row.health.cloud === "A" ? "green" : "orange"
                            }
                          />
                        )}

                        <img
                          alt=""
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "3px",
                          }}
                          src={splitIcon}
                        />

                        {row.health.device && (
                          <Circle
                            percentage={row.health.device}
                            color1={
                              row.health.device === "A" ? "green" : "orange"
                            }
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{row.location ? row.location : "N/A"}</TableCell>
                    <TableCell>{row.recorder ? row.recorder : "N/A"}</TableCell>
                    <TableCell>{row.tasks ? row.tasks : "N/A"} Tasks</TableCell>
                    <TableCell>
                      <DynamicButton
                        name={row.status}
                        btnColor={row.status}
                        bgColor="#ebe6e6"
                        onClick={() => updateStatus(row.id, row.status)}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        "&.MuiTableCell-root": {
                          paddingLeft: "32px",
                        },
                      }}
                    >
                      <DoNotDisturbIcon
                        onClick={() => {
                          removeRowFromTable(row.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredData?.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton={true}
          showLastButton={true}
          ActionsComponent={CustomTablePaginationActions}
          labelRowsPerPage=""
        />
      </Paper>
    </Box>
  );
};

export default App;
