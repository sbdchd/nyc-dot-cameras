BAD=$(curl -s http://207.251.86.238/cctv/0.jpg | base64)
for i in {0..1022}
do
  Q=$(curl -s "http://207.251.86.238/cctv/$i.jpg" | base64)
  [[  $Q != $BAD  ]] && continue
  echo "BAD $i"
  echo $i >> bad.txt
done
