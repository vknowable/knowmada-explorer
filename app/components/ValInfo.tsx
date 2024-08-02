'use client'

import { useState } from "react"
import { useAtom } from "jotai"
// import { chainStatusAtom, validatorInfoAtom, valAddrAtom } from "../store/store"
import { allValsAtom, valAddrAtom } from "../store/store"
import { NATIVE_SCALE } from "@/lib/helpers"
// import { getValidatorInfo } from "@/lib/getValidator"
import Link from "next/link"
import Image from "next/image"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import InfoRow from "@/app/components/InfoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  valAddr: string
}

export default function ValInfo({ valAddr }: Props) {

  // TODO: check if validator info exists in validator set store, if already populated before making another api request
  const [address, setAddress] = useAtom(valAddrAtom)
  setAddress(valAddr)
  // const [{ data: chainStatusData, isPending: statusPending, isError }] = useAtom(chainStatusAtom)
  // const [{ data: valInfo, isPending: valPending, isError: valError }] = useAtom(validatorInfoAtom)
  const [{ data: valData, isPending: valPending, isError: valError }] = useAtom(allValsAtom)

  if (valPending) {
    return (
      <div className="grid place-items-center mb-12">
        <Card className="w-[80%] mt-8">
          <CardHeader>
            <CardTitle>Validator Details:</CardTitle>
          </CardHeader>
          <CardContent>
            <div>Checking...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const valInfo: ValidatorInfo = valData?.find((val: ValidatorInfo) => val.address === address) ?? null
  if (valInfo === null) {
    return (
      <div className="grid place-items-center mb-12">
        <Card className="w-[80%] mt-8">
          <CardHeader>
            <CardTitle>Validator Details:</CardTitle>
          </CardHeader>
          <CardContent>
            <div>Not found!</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // const valStake = parseInt(valInfo.stake) / NATIVE_SCALE;
  const valStake = 1
  // const bonded = parseInt(chainStatusData.staking_info.bonded_supply) / NATIVE_SCALE;
  //TODO placeholder
  const bonded = 100

  // const uptime = valInfo?.uptime.uptime ? (valInfo.uptime.uptime * 100).toFixed(2) : "n/a";
  const uptime = 50
  // const commission = valInfo?.commission?.commission_rate ? (parseFloat(valInfo.commission.commission_rate) * 100).toFixed(2) : "n/a";
  const commission = valInfo.commission
  const votingPower = ((valStake / bonded) * 100).toFixed(4);

  const avatarUrl = valInfo.avatar ?? `/assets/Nam_0${Math.floor(Math.random() * 6) + 1}.svg`;

  let uptimeColor: string
  if (uptime >= 0.8) uptimeColor = "text-green-500 text-right"
  else if (uptime >= 0.5) uptimeColor = "text-orange-500 text-right"
  else uptimeColor = "text-red-500 text-right"

  const bonds: BondList[] = [];
  const unbonds: BondList[] = [];

  return (
    <div className="grid place-items-center mb-12">
      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Validator Details:</CardTitle>
          <CardDescription>(View the account page for <Link className="text-[#0DD] hover:text-[#0DD]/50" href={`/accounts/${valInfo.address}`}>{valInfo.address}</Link> instead)</CardDescription>
        </CardHeader>
        <CardContent>

          <Card className="mx-12 mt-4 p-12 border-2 border-primary/30 bg-primary/5">
            <CardContent className="grid place-items-center">
              <div className="flex flex-row gap-24 items-center mt-8">
                <Avatar className="w-48 h-48">
                  <AvatarImage src={avatarUrl} alt="" className="border-2 border-primary rounded-full" loading="lazy" />
                  <AvatarFallback>Nam</AvatarFallback>
                </Avatar>
                <Table className="w-[60%]">
                  {/* <TableHead>
                <TableRow>
              <TableHead className="invisible h-0"></TableHead>
              <TableHead className="invisible h-0"></TableHead>
            </TableRow>
              </TableHead> */}
                  <TableBody>
                    <InfoRow a="Name:" b={valInfo.name ?? "n/a"} />
                    <InfoRow a="Description:" b={valInfo.description ?? "n/a"} />
                    <InfoRow a="Website:" b={valInfo.website ?? "n/a"} />
                    <InfoRow a="Email:" b={valInfo.email ?? "n/a"} />
                    <InfoRow a="Discord:" b={valInfo.discordHandle ?? "n/a"} />
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

        </CardContent>
        <CardFooter className="grid place-items-center pt-8">
          <div className="">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Status:</TableCell>
                  <TableCell className="text-right"><Badge>{valInfo.state}</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Uptime:</TableCell>
                  <TableCell className={uptimeColor}>{uptime} %</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address:</TableCell>
                  <TableCell className="text-right">{valInfo.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tendermint Address:</TableCell>
                  {/* <TableCell className="text-right">{valInfo.tm_address}</TableCell> */}
                  <TableCell className="text-right">{"todo"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Voting Power:</TableCell>
                  <TableCell className="text-right">{votingPower} %</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Commission:</TableCell>
                  <TableCell className="text-right">{commission} %</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardFooter>

      </Card>

      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Bonds:</CardTitle>
          <CardDescription>Not supported yet</CardDescription>
        </CardHeader>
      </Card>

      <Card className="w-[80%] mt-8">
        <CardHeader>
          <CardTitle>Unbonds:</CardTitle>
          <CardDescription>Not supported yet</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
