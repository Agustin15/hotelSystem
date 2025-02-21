<?php

class Bill
{

    private $billDetails = [], $billRooms,
        $billServices;


    public function setBillRooms($rooms)
    {
        $this->billRooms = $rooms;
    }

    public function setBillServices($services)
    {

        $this->billServices = $services;
    }

    public function setBillDetails()
    {

        array_push($this->billDetails, $this->billRooms, $this->billServices);
    }

    public function getBillDetails()
    {
        return $this->billDetails;
    }
}
