'use client'

import { useState, useEffect } from "react"
import { truncateHash } from "@/lib/helpers"
import { NATIVE_SCALE } from "@/lib/helpers"
import { VALS_PER_PAGE } from "../store/store"
import { useAtom } from "jotai"
import { consensusSetResponseAtom, chainStatusAtom } from "../store/store"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Validators() {

  const [{ data: consensusValsData, isFetchingNextPage, isPending: valsPending, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, isError, isFetching: valsFetching }] = useAtom(consensusSetResponseAtom);
  const [{ data: chainStatusData, isPending: statusPending, isError: chainStatusError }] = useAtom(chainStatusAtom)
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPages, setMaxPages] = useState(1)

  useEffect(() => {
    if (consensusValsData?.pages[0]?.pagination !== null && consensusValsData?.pages[0]?.pagination !== undefined) {
      const total = consensusValsData?.pages[0]?.pagination?.total
      const per_page = consensusValsData?.pages[0]?.pagination?.per_page
      setMaxPages(Math.ceil(total / per_page))
      console.log("max", maxPages)
    }
  }, [consensusValsData, maxPages])

  const nextPage = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
    if (currentPage < maxPages) {
      setCurrentPage((page) => page + 1);
    }
  };

  const previousPage = () => {
    setCurrentPage((page) => page - 1)
  };

  if (valsPending || statusPending) {
    return (
      <div className="grid place-items-center mb-12">
      <Card className="w-[90%] mt-8">
        <CardHeader>
          <CardTitle>Active Validators:</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Checking...</div>
        </CardContent>
      </Card>
      </div>
    )
  }

  const bonded = parseInt(chainStatusData?.staking_info.bonded_supply)
  const consensusVals: ValidatorInfo[] = consensusValsData?.pages[currentPage - 1]?.consensus_set ?? []
  const endIndex = currentPage * consensusValsData?.pages[0]?.pagination.per_page
  const startIndex = endIndex - 19
  const total = consensusValsData?.pages[0]?.pagination.total


  // TODO: include a tab for inactive validators
  return (
    <div className="grid place-items-center mb-12">
    <Card className="w-[90%] mt-8">
      <CardHeader>
        <CardTitle>Active Validators:</CardTitle>
        <CardDescription>Showing validators {startIndex} - {endIndex} of {total}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 justify-start items-center">
        <ChevronLeft className="w-4" />
        <Button className="rounded w-[60px] h-[30px]" onClick={previousPage} disabled={currentPage <= 1}>
          Prev
        </Button>
        <Button className="rounded w-[60px] h-[30px]" onClick={nextPage} disabled={currentPage >= maxPages}>
          Next
        </Button>
        <ChevronRight className="w-4" />
        </div>
        <Table>
          <TableHeader>
            <TableHead>Rank</TableHead>
            <TableHead>Validator</TableHead>
            <TableHead>Stake</TableHead>
            <TableHead>Voting Power</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead>Uptime</TableHead>
            <TableHead>Status</TableHead>
          </TableHeader>
          <TableBody>
            {valsFetching ? <div>Checking...</div>
            : consensusVals.map((val: ValidatorInfo, i: number) =>
              <ValidatorRow key={val.tm_address} validator={val} bonded={bonded} currentPage={currentPage} index={i} perPage={VALS_PER_PAGE} />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
  )
}

const ValidatorRow = ({ validator, bonded, index, currentPage, perPage }: { validator: ValidatorInfo, bonded: number, index: number, currentPage: number, perPage: number }) => {
  const rank = ((currentPage - 1) * VALS_PER_PAGE) + index + 1
  const stake = (parseInt(validator.stake ?? "0") / NATIVE_SCALE).toFixed(0)
  const stakePercent = (parseInt(validator.stake ?? "0") / bonded * 100).toFixed(4)
  const commission = validator.commission?.commission_rate ? ((parseFloat(validator.commission.commission_rate) * 100).toFixed(2)) : "n/a"
  const avatarUrl = validator.metadata?.avatar ?? `/assets/Nam_0${Math.floor(Math.random() * 6) + 1}.svg`
  const avatarFallback = `/assets/Nam_0${Math.floor(Math.random() * 6) + 1}.svg`
  const uptime = (validator.uptime.uptime * 100).toFixed(2)
  let uptimeColor: string
  if (validator.uptime.uptime >= 0.8) uptimeColor = "text-green-500"
  else if (validator.uptime.uptime >= 0.5) uptimeColor = "text-orange-500"
  else uptimeColor = "text-red-500"

  return (
    <TableRow>
      <TableCell className="text-zinc-300">{rank}</TableCell>
      <TableCell className="flex flex-row items-center gap-2">
        {/* <Image loading="lazy" alt="" src={avatarUrl} width="32" height="32" className="h-8 w-8 border-2 border-light/20 inline mr-4 rounded-full"></Image> */}
        <Avatar className="w-8 h-8">
          <AvatarImage src={avatarUrl} alt="" className="border-2 border-primary rounded-full" loading="lazy" />
          <AvatarFallback>Nam</AvatarFallback>
        </Avatar>
        <Link className="text-[#0DD] hover:text-[#0DD]/50 " href={`/validators/${validator.nam_address}`}>{truncateHash(validator.nam_address, 12, 12)}</Link>
      </TableCell>
      <TableCell className="text-zinc-300">{stake}</TableCell>
      <TableCell><Badge>{stakePercent} %</Badge></TableCell>
      <TableCell className="text-zinc-300">{commission} %</TableCell>
      <TableCell className={uptimeColor}>{uptime} %</TableCell>
      <TableCell><Badge>{validator.state}</Badge></TableCell>
    </TableRow>
  )
}
