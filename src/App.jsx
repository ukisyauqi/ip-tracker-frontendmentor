import React, { useState } from "react";
import {
  Text,
  Box,
  Input,
  Center,
  InputGroup,
  InputRightElement,
  Button,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import bgPattern from "./images/pattern-bg.png";
import iconArrow from "./images/icon-arrow.svg";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

export default function App() {
  const [inputIpAddress, setInputIpAddress] = useState("");
  const [dataRegion, setDataRegion] = useState("");
  const [dataTimeZone, setDataTimeZone] = useState("");
  const [dataIsp, setDataIsp] = useState("");
  const [dataIp, setDataIp] = useState("");
  const [location, setLocation] = useState(["-10.7063", "108.6590"]);

  const handleInputIpAddressChange = (event) => {
    setInputIpAddress(event.target.value);
  };

  const handleClickIpAddress = () => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_eALmBk6q6jtnY0y3zc07ls0V8zAm1&ipAddress=${inputIpAddress}`
      )
      .then(function (response) {
        setDataRegion(response.data.location.region);
        setDataTimeZone(response.data.location.timezone);
        setDataIsp(response.data.isp);
        setDataIp(response.data.ip);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });

    axios
      .get(`https://ipinfo.io/${inputIpAddress}?token=639c30bf340d1d`)
      .then(function (response) {
        setLocation(response.data.loc.split(","));
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  return (
    <Box h="100vh">
      <Box
        bgImage={`url(${bgPattern})`}
        bgSize="cover"
        bgRepeat="no-repeat"
        h={245}
        pt={5}
      >
        <Text align="center" fontSize="3xl" color="white">
          IP Address Tracker
        </Text>
        <Center>
          <InputGroup w={480} mt={4} size="lg">
            <Input
              placeholder="Input Ip Address"
              bg="white"
              borderRadius="xl"
              onChange={handleInputIpAddressChange}
            />
            <InputRightElement>
              <Button
                size="sm"
                h="full"
                w="full"
                borderLeftRadius="none"
                borderRightRadius="xl"
                variant="dark"
                onClick={handleClickIpAddress}
              >
                <Image src={iconArrow}></Image>
              </Button>
            </InputRightElement>
          </InputGroup>
        </Center>
        <Box w="100vw" px="15vw" position="absolute" zIndex="999">
          <Box
            bg="white"
            minH={32}
            mt={12}
            py={6}
            boxShadow="xl"
            borderRadius="xl"
          >
            <SimpleGrid columns={4}>
              <Box borderRight="1px solid #dddddd" px={6}>
                <Text
                  fontSize="0.7rem"
                  fontWeight="bold"
                  color="gray"
                  letterSpacing="widest"
                >
                  IP ADDRESS
                </Text>
                <Text fontSize="2xl" lineHeight="1.2" fontWeight="bold" mt={2}>
                  {dataIp}
                </Text>
              </Box>
              <Box borderRight="1px solid #dddddd" px={6}>
                <Text
                  fontSize="0.7rem"
                  fontWeight="bold"
                  color="gray"
                  letterSpacing="widest"
                >
                  LOCATION
                </Text>
                <Text fontSize="2xl" lineHeight="1.2" fontWeight="bold" mt={2}>
                  {dataRegion}
                </Text>
              </Box>
              <Box borderRight="1px solid #dddddd" px={6}>
                <Text
                  fontSize="0.7rem"
                  fontWeight="bold"
                  color="gray"
                  letterSpacing="widest"
                >
                  TIMEZONE
                </Text>
                <Text fontSize="2xl" lineHeight="1.2" fontWeight="bold" mt={2}>
                  {dataTimeZone}
                </Text>
              </Box>
              <Box borderRight="1px solid #dddddd" px={6}>
                <Text
                  fontSize="0.7rem"
                  fontWeight="bold"
                  color="gray"
                  letterSpacing="widest"
                >
                  ISP
                </Text>
                <Text fontSize="2xl" lineHeight="1.2" fontWeight="bold" mt={2}>
                  {dataIsp}
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
      <Box h="calc(100vh - 245px)" zIndex="-1" bg="teal">
        <MapContainer
          center={location}
          zoom={4}
          scrollWheelZoom={false}
  
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
}
